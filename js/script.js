const url = "https://api.noroff.dev/api/v1/gamehub";

async function makeApiCall() {
  const response = await fetch(url);

  const results = await response.json();

  console.log(results);
}

makeApiCall();
