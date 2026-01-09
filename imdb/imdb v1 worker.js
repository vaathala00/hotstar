export default {
  async fetch(request) {
    const url = new URL(request.url);
    const imdbID = url.searchParams.get("id");

    if (!imdbID) {
      return new Response(JSON.stringify({ error: "Missing IMDb ID" }), {
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    const res = await fetch(`https://www.imdb.com/title/${imdbID}/`);
    const html = await res.text();

    // Extract JSON-LD
    const ldJsonMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (!ldJsonMatch) {
      return new Response(JSON.stringify({ error: "IMDb JSON-LD not found" }), {
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    let data;
    try {
      data = JSON.parse(ldJsonMatch[1]);
    } catch {
      return new Response(JSON.stringify({ error: "Failed to parse JSON-LD" }), {
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    // Poster
    const poster = data.image || "";

    // Title
    const title = data.name || "Unknown";

    // Rating
    const rating = data.aggregateRating?.ratingValue || "N/A";

    // Year
    const year = data.datePublished?.split("-")[0] || "N/A";

    // Genres with default
    const genres = data.genre?.join(" ‧ ") || "Drama";

    // Runtime (try JSON-LD duration, fallback to HTML parsing)
    let runtime = "N/A";
    if (data.duration) {
      const m = data.duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
      if (m) {
        const hours = parseInt(m[1] || "0");
        const minutes = parseInt(m[2] || "0");
        runtime = `${hours}h ${minutes}m`;
      }
    } else {
      // fallback: try HTML
      const runtimeMatch = html.match(/<time datetime="PT(\d+)M"/);
      if (runtimeMatch) {
        const minutes = parseInt(runtimeMatch[1]);
        runtime = `${Math.floor(minutes/60)}h ${minutes%60}m`;
      }
    }

    // Director
    const director = Array.isArray(data.director)
      ? data.director.map(d => d.name).join(" ‧ ")
      : (data.director?.name || "N/A");

    // Writers (remove empty names)
    const writersArr = Array.isArray(data.creator)
      ? data.creator.map(w => w.name).filter(n => n && n.trim())
      : (data.creator?.name ? [data.creator.name] : []);
    const writers = writersArr.join(" ‧ ") || "N/A";

    // Stars (first 3)
    const stars = Array.isArray(data.actor)
      ? data.actor.slice(0, 3).map(a => a.name).join(" ‧ ")
      : "N/A";

    const output = { title, rating, year, genres, runtime, poster, director, writers, stars };

    return new Response(JSON.stringify(output), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
