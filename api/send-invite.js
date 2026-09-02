export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  const {
    email,
    groupName
  } = req.body;

  const response = await fetch(
    'https://api.resend.com/emails',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from:
          'SplitApp <onboarding@resend.dev>',

        to: [email],

        subject:
          `Inbjudan till ${groupName}`,

        html: `
          <h2>Du har blivit inbjuden till SplitApp</h2>

          <p>
            Du har blivit inbjuden till gruppen
            <strong>${groupName}</strong>.
          </p>

          <p>
            Logga in eller skapa konto
            för att acceptera inbjudan.
          </p>

          <p>
            <a href="https://pengasplitt-jl.app
              Öppna SplitApp
            </a>
          </p>
        `
      })
    }
  );

  const data = await response.json();

  return res.status(200).json(data);

}
