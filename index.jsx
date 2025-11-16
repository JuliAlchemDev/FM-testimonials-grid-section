const { useState, useEffect } = React;


export const App = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [cardStyles, setCardStyles] = useState({});


  const fetchTestimonials = async () => {
    try {
      const testimonialsRes = await fetch("./testimonials-data.json", {
        cache: "no-store",
      });
      if (!testimonialsRes.ok) {
        throw new Error("Response was not ok");
      }
      const testimonialsData = await testimonialsRes.json();
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCardStyles = async () => {
    try {
      const stylesRes = await fetch("./card-styles.json", {
        cache: "no-store",
      });
      if(!stylesRes.ok){
        throw new Error("There were some problems to get styles...")
      }
      const stylesData = await stylesRes.json();
      setCardStyles(stylesData);
    } catch (error){
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchTestimonials();
    fetchCardStyles();
  }, []);
 
  return (
    <main className="testimonials-grid">
      {testimonials.map(({ name, role, summary, story, style }, index) => {
        const cardStyle = cardStyles[style] || {};
       
        const imageName = name.split(" ")[0].toLowerCase();
        const imageSource = `./assets/images/image-${imageName}.jpg`;

    

        return (
          <section key={index} className={`testimonials-grid__card ${cardStyle.card || ''}`}>
            <header className="testimonials-grid__card-header">
              <img
              className={`testimonials-grid__card-header__avatar ${cardStyle.avatar || ''}`}
              src={imageSource}
              alt={name}
              width='28'
              height='28'
            />

            <h2 className={`testimonials-grid__card-header__name ${cardStyle.name || ''}`}>{name}</h2>
            <p className={`testimonials-grid__card-header__role ${cardStyle.role || ''}`}>{role}</p>
            </header>
            
            <h3 className={`testimonials-grid__card-summary ${cardStyle.summary || ''}`}>{summary}</h3>
            <q className={`testimonials-grid__card-story ${cardStyle.story || ''}`}> {story} </q>
          </section>
        );
      })}
    </main>
  );
};
