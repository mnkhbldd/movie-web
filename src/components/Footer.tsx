import { Film, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <div className="flex justify-around w-full bg-[#4338CA] text-white py-10">
      {" "}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <Film />
          <p>Movie Z</p>
        </div>
        <p>© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex gap-[54px]">
        <div className="flex flex-col gap-3 ">
          <p>Contact Information</p>
          <div className="flex items-center gap-3 ">
            <Mail />
            <div>
              <p>Email:</p>
              <p>support@movieZ.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone />
            <div>
              <p>Phone:</p>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>Follow Us</p>
          <div className="flex gap-3">
            <a href="www.google.com">Facebook</a>
            <a href="www.google.com">Instagram</a>
            <a href="www.google.com">Twitter</a>
            <a href="www.google.com">Youtube</a>
          </div>
        </div>
      </div>
    </div>
  );
};
