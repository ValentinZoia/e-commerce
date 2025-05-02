import app from "./app";
// import prisma from './config/prisma'

const PORT = process.env.PORT || 5000;

async function main(){
    try {
        // await prisma.$connect();
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (error) {
        console.error(error)
    }
}

main().catch(async (e) =>{
    console.error(e);
    // await prisma.$disconnect();
    process.exit(1);

});