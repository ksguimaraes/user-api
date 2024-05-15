import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query']
})

async function seed() {
    await prisma.address.create({
        data: {
            id: 'e0a4c0a0-1f2e-4f2e-8f4d-3f4c4e4d4c4e',
            street: 'Rua teste',
            number: 123,
            complement: 'A',
            neighborhood: 'Teste',
            city: 'Teste',
            state: 'Teste',
            zipCode: '00000-000'
        }
    })

    // await prisma.user.create({
    //     data: {
    //         id: 'de600d19-3675-478e-8a0b-f5db48a248f4',
    //         cpf: '000.000.000-00',
    //         password: '123456',
    //         name: 'Teste',
            
    //     }
    // })
}