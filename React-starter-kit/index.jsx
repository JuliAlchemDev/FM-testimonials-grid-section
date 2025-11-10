const { useState, useEffect } = React;

export const App = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("./testimonials-data.json", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Response was not ok");
      }
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <main className="testimonials-grid">
      {testimonials.map(({ name, role, summary, story }, index) => {
        const imageName = name.split(" ")[0].toLowerCase();
        const imageSource = `./assets/images/image-${imageName}.jpg`;

        return (
          <section key={index} className="testimonials-grid__card">
            <header className="testimonials-grid__card-header">
              <img
              className="testimonials-grid__card-header__image"
              src={imageSource}
              alt={name}
              width='56'
              height='56'
            />

            <h2 className="testimonials-grid__card-header__name">{name}</h2>
            <p className="testimonials-grid__card-header__role">{role}</p>
            </header>
            
            <h3 className="testimonials-grid__card-summary">{summary}</h3>
            <q className="testimonials-grid__card-story"> {story} </q>
          </section>
        );
      })}
    </main>
  );
};
