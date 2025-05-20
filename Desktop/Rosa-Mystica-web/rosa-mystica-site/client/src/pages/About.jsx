import { motion } from 'framer-motion';

function About() {
  const team = [
    {
      name: 'Mary David',
      role: 'Founder & CEO',
      image: '/team/Mary.jpg', // Save this image in /public/team
    },
    {
      name: 'Capt. George David',
      role: 'CFO',
      image: '/team/george.jpg',
    },
    {
      name: 'Capt. C.K Dhiman',
      role: 'Co-Founder & FO',
      image: '/team/aman.jpg',
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 text-maroon-900">
      <div className="bg-maroon-700 text-red-600 py-16 text-center">
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Rosa Mystica India
        </motion.h1>
        <p className="max-w-xl mx-auto text-black">
          Rooted in the foothills of Uttarakhand, we craft lifestyle and beverage products with heart.
        </p>
      </div>
<section className="text-center">
  <h2 className="text-2xl font-bold text-[#5D001E]  mb-4"> Our Team</h2>
  <p className="text-gray-600 max-w-xl mx-auto mb-6">
    Behind every bottle, mug, and stitch — there's a passionate team committed to quality, authenticity, and innovation.
  </p>
  <div className="max-w-4xl mx-auto">
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
 

    <img
      src="/team/team-photo.jpg"  // <-- put your image in /public/team/
      alt="Rosa Mystica Team"
      className="w-full rounded-xl shadow-md border-4 border-maroon-700 object-cover"
    />
    </motion.div>
  </div>
</section>
      <div className="max-w-5xl mx-auto py-14 px-6 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold text-maroon-800 mb-4">🌸 Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Rooted in the foothills of Uttarakhand, Rosa Mystica India is a homegrown brand dedicated to crafting premium lifestyle and beverage products with authenticity and care.

Inspired by the purity of the Himalayas and the warmth of local traditions, we create everything from refreshing squashes made with handpicked mountain botanicals to beautifully printed mugs and hand-sewn napkins that blend elegance with utility.

Every product is more than just a commodity — it's a piece of culture, passion, and community. We work closely with regional artisans, farmers, and designers to ensure that what reaches you is pure, thoughtfully made, and full of soul.

Whether it's your morning tea, your dining table, or your festive gift — Rosa Mystica India adds charm, taste, and a personal touch to everyday living.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-maroon-800 mb-4">💡 What We Believe</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Locally sourced and ethically made.</li>
            <li>Every product should tell a story.</li>
            <li>Quality is never compromised.</li>
            <li>Customer experience is at the heart of everything.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-maroon-800 mb-4">📍 Based in Dehradun, Uttarakhand</h2>
          <p className="text-gray-700">
            We operate from the lush, serene valleys of Dehradun — using nature's bounty to deliver freshness, flavor, and finesse.
            Rosa Mystica is not just a brand; it’s a movement to bring the soul of the hills into your home.
          </p>
        </section>
 {/* 👥 Meet the Team */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-[#5d000e] mb-6">Meet the founders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-maroon-700 mb-4"
                />
                <h4 className="text-lg font-semibold text-maroon-700">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="text-center mt-12">
          <p className="text-lg font-medium text-maroon-900 mb-2">Have questions?</p>
          <a href="/contact" className="text-blue-600 hover:underline">Contact Us →</a>
        </section>
      </div>
    </div>
  );
}

export default About;
