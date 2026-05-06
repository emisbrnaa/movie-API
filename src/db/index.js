import mongoose from 'mongoose';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Berhasil connect ke database");
}

export default main