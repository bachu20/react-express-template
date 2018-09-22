import faker from "faker"

export const sampleNewUser = {
  role: 'parent',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber(),
  responses: [1,2,3,4,5].map(num => ({
    questionID: faker.random.uuid(),
    response: faker.random.boolean()
  })),
  bio: faker.lorem.sentences(3),
  street: faker.address.streetName(),
  city: faker.address.city(),
  state: faker.address.stateAbbr(),
  zipCode: faker.address.zipCode()
}