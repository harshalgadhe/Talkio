import { PrismaClient } from '@prisma/client'

class DBClient {
  constructor() {
    this.prisma = new PrismaClient();
  }

  static getInstance() {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  }
}

export default DBClient