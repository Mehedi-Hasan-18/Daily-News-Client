import { Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Submit handler
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Message sent successfully!");
    reset();
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-black">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-black max-w-2xl mx-auto text-xl">
          We'd love to hear from you! Whether you have feedback, questions, or
          partnership inquiries — feel free to reach out.
        </p>
      </div>

      {/* Contact Info + Form */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Contact Info Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>

          <div className="flex items-center space-x-4">
            <Mail className="text-blue-600" />
            <p className="text-xl">mdmehedihasanroby@gmail.com</p>
          </div>

          <div className="flex items-center space-x-4">
            <Phone className="text-blue-600" />
            <p className="text-xl">+60 174142969</p>
          </div>

          <div className="flex items-center space-x-4">
            <MapPin className="text-blue-600" />
            <p className="text-xl">Cyberjaya, Selangor, Malaysia</p>
          </div>

          {/* Social Media */}
          <div className="pt-6">
            <h3 className="text-3xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-5">
              <a
                href="https://www.facebook.com/mehedi.hasan.312630"
                className="hover:opacity-80 transition"
              >
                <FaFacebook size={28} color="#1877F2" />
              </a>
              <a
                href="https://www.linkedin.com/in/mehedi-hasan-85278b2a0/"
                className="hover:opacity-80 transition"
              >
                <FaLinkedin size={28} color="#1DA1F2" />
              </a>
              <a
                href="https://www.instagram.com/meheeeeedi_hasan/"
                className="hover:opacity-80 transition"
              >
                <FaInstagram size={28} color="#E1306C" />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <FaYoutube size={28} color="#FF0000" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-2xl shadow-blue-200 rounded-2xl border-b-black border p-8 space-y-6"
        >
          <h1 className="text-xl text-center font-semibold text-blue-600">
            Contact Form
          </h1>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Full name is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              {...register("message", { required: "Message is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
