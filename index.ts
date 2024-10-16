Deno.serve(async (req: Request) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('Access-Control-Allow-Origin','*');
  myHeaders.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
  myHeaders.append('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token');

  let word2:string = "";

  // Extract guess GET parameter 
  try {
    const url = new URL(req.url);
    word2 = url.searchParams.get("guess");
    console.log(word2);
  } catch (error) {
    console.error("Error:", error);
    return new Response(`Error: ${error.message}`, { status: 400 });
  }

  const raw = JSON.stringify({
      "word1": "centrale",
      "word2": word2
  });

  const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
  };

  try {
      const response = await fetch("http://word2vec.nicolasfley.fr/similarity", requestOptions);
      
      if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return new Response(`Error: ${response.statusText}`, { status: response.status });
      }

      const result = await response.json();

      console.log(result);
      return new Response(JSON.stringify(result), {
          headers: { "Content-Type": "application/json" },
          status: 200
      });
      
  } catch (error) {
      console.error("Fetch error:", error);
      return new Response(`Error: ${error.message}`, { status: 500 });
  }
});
