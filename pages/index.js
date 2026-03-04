/* Index . */

// React convention for components (first letter capitalized)
function Home() {
    return(
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div>
                <p style={{fontSize:24, fontFamily: '"ui-monospace", "SFMono-Regular", Menlo, Consolas', color:"darkgreen"}}>Hello World!</p>      
                <p style={{ margin: 0, fontSize: 24, fontFamily: '"Palatino Linotype","Book Antiqua",Palatino,"Apple Chancery","Segoe Script"', lineHeight: 1.5 }}>
                    “If you wish to make an apple pie from scratch, you must first invent the universe”{" "}
                    <a href="https://youtu.be/s4VIc8Qt5xM?si=Vo2EzpAuIeQxphGH" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline", fontWeight: 600 }}>
                    Carl Sagan
                    </a>
                </p>
                <p style={{ marginTop: 8, marginBottom: 0, fontSize: 16, color: "#6b7280", lineHeight: 1.5, fontFamily: '"Inter",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif' }}>
                    “Se você deseja fazer uma torta de maçã do zero, primeiro precisa inventar o universo.”
                </p>

            </div>
            <div style={{ display: "flex", justifyContent: "center", width: "100%", maxWidth: 420 }}> 
                <iframe
                    data-testid="embed-iframe"
                    style={{ borderRadius: "12px" }}
                    src="https://open.spotify.com/embed/playlist/1UVsKdUBk44T4OCgm8KCw5?utm_source=generator"
                    width="100%"
                    height="250"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    loading="lazy"
                    title="Spotify Playlist"
                />
            </div>
        </div>
    );
}



// We need to export the functions to render the page

// Default - O padrão pra a partir dele se chama o restante da página
export default Home;
