'use client';

export default function TripList() {
  const trips = [
    {
      img: 'https://www.material-tailwind.com/image/blog-11.jpeg',
      title: 'Alps Adventure',
      desc: 'Explore the stunning views of the Swiss Alps with hiking routes and scenic stops.',
    },
    {
      img: 'https://www.material-tailwind.com/image/blog-10.jpeg',
      title: 'New York City',
      desc: 'Dive into NYC’s culture, food, and unforgettable skyline.',
    },
    {
      img: 'https://demos.creative-tim.com/material-kit-pro/assets/img/examples/card-blog2.jpg',
      title: 'Beach Escape',
      desc: 'Sun, sand, and surf — perfect coastal relaxation.',
    },
    {
      img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1',
      title: 'Tokyo Lights',
      desc: 'Experience the blend of tradition and tech in Japan’s capital.',
    },
    {
      img: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
      title: 'Patagonia Trek',
      desc: 'Trek through glaciers, mountains and remote beauty in South America.',
    },
    {
      img: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef',
      title: 'Sahara Journey',
      desc: 'Camel rides, starry nights, and desert dunes await.',
    },
    {
        img: 'https://www.material-tailwind.com/image/blog-11.jpeg',
        title: 'Alps Adventure',
        desc: 'Explore the stunning views of the Swiss Alps with hiking routes and scenic stops.',
      },
      {
        img: 'https://www.material-tailwind.com/image/blog-10.jpeg',
        title: 'New York City',
        desc: 'Dive into NYC’s culture, food, and unforgettable skyline.',
      },
      {
        img: 'https://demos.creative-tim.com/material-kit-pro/assets/img/examples/card-blog2.jpg',
        title: 'Beach Escape',
        desc: 'Sun, sand, and surf — perfect coastal relaxation.',
      },
      {
        img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1',
        title: 'Tokyo Lights',
        desc: 'Experience the blend of tradition and tech in Japan’s capital.',
      },
      {
        img: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
        title: 'Patagonia Trek',
        desc: 'Trek through glaciers, mountains and remote beauty in South America.',
      },
      {
        img: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef',
        title: 'Sahara Journey',
        desc: 'Camel rides, starry nights, and desert dunes await.',
      },
  ];

  return (
    <div className="w-full px-6 py-10 pb-20 box-border ">
      <div
        className="grid gap-6"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {trips.map((trip, index) => (
          <div
            key={index}
            className="card w-full min-w-[280px] shadow-md overflow-hidden"
          >
            <div
              className="img-responsive img-responsive-21x9 card-img-top"
              style={{ backgroundImage: `url(${trip.img})` }}
            />
            <div className="card-body">
              <h3 className="card-title">{trip.title}</h3>
              <p className="text-secondary">{trip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}