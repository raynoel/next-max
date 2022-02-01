import { connectDatabase, insertDocument } from '../../helpers/db-util';

// Enregistre un "newsletter" dans la DB
async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    let client;

    // Vérifie si le courriel est valide
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    // Obtient une connection avec la DB
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    // Ajoute le document à la DB
    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
