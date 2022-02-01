import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({message: "Invalid email address."})
      return
    }

    // Connecte à la DB et ajoute un document appelé "email"
    const client = await MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true });
    const db = client.db()
    await db.collection('emails').insertOne({email: userEmail})
    client.close()

    console.log(userEmail)
    res.status(201).json({ message: 'Signed up"'})
  }
}

export default handler