Deno.serve(async (req: Request) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
      "word1": "centrale",
      "word2": "supelec"
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
