import axios from "axios"
import { config } from "../config"

const apiConfig = {
  baseURL: `${config.serverHost}:${config.serverPort}/api`,
  timeout: config.apiTimeout,
  crossDomain: true
}

export const api = axios.create(apiConfig)