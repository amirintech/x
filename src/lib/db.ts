import neo4j, { Driver } from 'neo4j-driver'

const NEO4J_URI = process.env.NEO4J_URI!
const NEO4J_USERNAME = process.env.NEO4J_USERNAME!
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD!

let driver: Driver

declare global {
  var _neo4jDriver: Driver | undefined
}

if (!global._neo4jDriver)
  global._neo4jDriver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD), {
    disableLosslessIntegers: true,
  })

driver = global._neo4jDriver

export default driver
