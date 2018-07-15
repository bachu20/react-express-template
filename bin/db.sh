#!/usr/bin/env bash

env_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd -P)"
show_env=0
command_args=()

function swap_sequelize_template {
    local orig_template_file="${env_dir}/../node_modules/sequelize-cli/lib/assets/migrations/skeleton.js"
    local new_template_file="${env_dir}/migration_template.js"
    mv "${orig_template_file}" "${orig_template_file}.tmp"
    cp "${new_template_file}" "${orig_template_file}"
}

function unswap_sequelize_template {
    local orig_template_file="${env_dir}/../node_modules/sequelize-cli/lib/assets/migrations/skeleton.js"
    local new_template_file="${env_dir}/migration_template.js"
    rm "${orig_template_file}"
    mv "${orig_template_file}.tmp" "${orig_template_file}"
}

function do_sequelize {
    echo "Running sequelize-cli: $@"
    ( cd "${env_dir}/../src/db"; "${env_dir}/../node_modules/.bin/sequelize" "$@" --config "${env_dir}/../src/config/sequelize-config.js")
}

function do_migration_create {
    swap_sequelize_template

    trap unswap_sequelize_template EXIT

    do_sequelize "migration:create" "$@" || return $?
}

function do_db_migrate {
    do_sequelize "db:migrate"
}

function do_db_migrate_undo {
    do_sequelize "db:migrate:undo"
}

function do_db_migrate_test {
    do_sequelize "db:migrate"
    do_sequelize "db:migrate:undo"
}

function do_db_dump {
    pg_dump "$@"
}

function do_model_generate {
    local name="$(node -p -e 'const args = process.argv.slice(1); require("yargs").parse(args).name || "unknown";' -- "$@")"
    [[ "${name}" = "unknown" ]] && { echo "--name is required" >&2; exit 1; }
    local plural_name="$(node -p -e 'require("pluralize")(process.argv[1])' "${name}")"

    local model_template_file="${env_dir}/model_template.js"
    local model_target_file="${env_dir}/../src/db/models/${name}.js"
    sed -E -e "s/<<<name>>>/${name}/g;s/<<<plural_name>>>/${plural_name}/g" <"${model_template_file}" >"${model_target_file}"

    do_migration_create --name "create_${name}"
    echo -e "New model was created at \e[94m${model_target_file}\e[0m ."
}

function do_db_reset_force {
    echo "Force-Dropping database tembii"
    local TARGETDB="tembii"
    psql postgres <<-EOF
		 SELECT pg_terminate_backend(pid)
		   FROM pg_stat_activity
		  WHERE datname = '${TARGETDB}' AND pid <> pg_backend_pid();
		 DROP DATABASE IF EXISTS ${TARGETDB};

         CREATE DATABASE ${TARGETDB};
	EOF

    echo "Created database ${TARGETDB}"
}


run="do_sequelize"

while (( "$#" )); do
    case "$1" in
        run)
            run="do_sequelize" ;;

        db:reset)
            run="do_db_reset_force" ;;

        db:migrate)
            run="do_db_migrate" ;;

        db:migrate:undo)
            run="do_db_migrate_undo" ;;

        db:migrate:test)
            run="do_db_migrate_test" ;;

        migration:create)
            run="do_migration_create" ;;

        model:generate)
            run="do_model_generate" ;;

        db:dump)
            run="do_db_dump" ;;

        #add more switches here

        --)
            shift
            command_args+=( "$@" )
            break ;;

        *) command_args+=( "$1" ) ;;
    esac
    shift
done

"${run}" "${command_args[@]}"
