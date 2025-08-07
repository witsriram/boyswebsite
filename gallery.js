async function loadGallery() {
  try {
    const response = await fetch('data/gallery.json');
    const data = await response.json();
    const container = document.getElementById('gallery');

    Object.keys(data).sort().forEach(year => {
      const section = document.createElement('section');
      const heading = document.createElement('h2');
      heading.textContent = year;
      section.appendChild(heading);

      const wrapper = document.createElement('div');
      wrapper.className = 'gallery';

      data[year].forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Twins in ${year}`;
        wrapper.appendChild(img);
      });

      section.appendChild(wrapper);
      container.appendChild(section);
    });
  } catch (err) {
    console.error('Failed to load gallery', err);
  }
}

loadGallery();

