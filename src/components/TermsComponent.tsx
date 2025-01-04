import React, { useEffect } from "react";

const TermsComponent = () => {
    useEffect(() => {
        document.body.style.overflow = "auto";
    }, []);
  return (
    <>
  <div className="bg-gray-50 text-gray-800 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-6">Terms and Conditions</h1>
        <div className=" p-6 ">
          <section className="">
            <h2 className="text-2xl font-semibold mb-[11px]">1. Introduction</h2>
            <p className="mb-4">
              Welcome to [Your Site Name]! Our platform is designed to facilitate easy and secure file sharing. By accessing or using our services, you are agreeing to abide by the following terms and conditions. These terms constitute a legally binding agreement between you and [Your Site Name]. If you do not agree with any part of these terms, you must refrain from using our platform. We reserve the right to update or modify these terms at any time, so please review them regularly to stay informed about your obligations and rights.
            </p>
          </section>

          <section className="mt-[25px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px]">
            <h2 className="text-2xl font-semibold mb-[11px]">2. Use of Services</h2>
            <p className="mb-4">
              You are granted a limited, non-exclusive, and revocable license to use our services for lawful purposes only. This means that you must not use our platform to upload, share, or distribute any content that:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Infringes on the intellectual property rights of others, such as copyrighted material or trademarks without authorization.</li>
              <li>Contains viruses, malware, or any harmful code designed to disrupt or damage systems, software, or hardware.</li>
              <li>Promotes violence, discrimination, or any illegal activities.</li>
            </ul>
            <p className="mb-4">
              We reserve the right to monitor your use of the platform to ensure compliance with these terms. Violations may result in immediate suspension or termination of your access to our services.
            </p>
          </section>

          <section className="mt-[25px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px]">
            <h2 className="text-2xl font-semibold mb-[11px]">3. Account Responsibilities</h2>
            <p className="mb-4">
              If you choose to create an account on our platform, it is your responsibility to ensure the security of your login credentials. You must not share your username or password with anyone else. Any actions taken under your account are your responsibility, whether or not you authorized them. If you suspect unauthorized access to your account, you must notify us immediately so we can take appropriate action to protect your data and the integrity of our platform.
            </p>
          </section>

          <section className="mt-[25px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px]">
            <h2 className="text-2xl font-semibold mb-[11px]">4. File Sharing</h2>
            <p className="mb-4">
              Our platform allows you to upload and share files with others. However, files are stored temporarily and may be deleted after a specified retention period. We recommend that you do not rely on our platform as your primary storage solution. Always maintain backups of your important files. While we strive to protect the files you upload, we cannot guarantee their absolute security against unauthorized access, data loss, or corruption. Use our service at your own discretion and risk.
            </p>
          </section>

          <section className="mt-[25px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px]">
            <h2 className="text-2xl font-semibold mb-[11px]">5. Intellectual Property</h2>
            <p className="mb-4">
              All content, including text, graphics, logos, and software on this platform, is the intellectual property of [Your Site Name] or its licensors. Unauthorized use, reproduction, or distribution of this content is strictly prohibited. By using our platform, you agree to respect our intellectual property rights as well as the intellectual property rights of others. Any content you upload to the platform must also comply with applicable copyright and intellectual property laws.
            </p>
          </section>

          <section className="mt-[25px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px]">
            <h2 className="text-2xl font-semibold mb-[11px]">6. Privacy Policy</h2>
            <p className="mb-4">
              Protecting your privacy is important to us. Our Privacy Policy outlines how we collect, use, and store your personal information. By using our platform, you consent to the practices described in our Privacy Policy. We recommend reviewing this policy to understand your rights and our obligations regarding your data. If you have any questions about how your data is handled, please contact our support team.
            </p>
          </section>

          <section className="mt-[25px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px]">
            <h2 className="text-2xl font-semibold mb-[11px]">7. Termination</h2>
            <p className="mb-4">
              We reserve the right to suspend or terminate your access to our services at any time, with or without notice, if we believe you have violated these terms or engaged in any activities that may harm our platform or other users. Upon termination, you will lose access to any files or data associated with your account. It is your responsibility to download or backup important files before termination occurs.
            </p>
          </section>

          <section className="mt-[25px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px]">
            <h2 className="text-2xl font-semibold mb-[11px]">8. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, [Your Site Name] and its affiliates are not liable for any indirect, incidental, or consequential damages arising from your use of our platform. This includes, but is not limited to, loss of data, profits, or business opportunities. Our platform is provided on an as-is basis, and we disclaim all warranties, express or implied. You assume full responsibility for any risks associated with using our services.
            </p>
          </section>

          <section className="mt-[25px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px]">
            <h2 className="text-2xl font-semibold mb-[11px]">9. Modifications</h2>
            <p className="mb-4">
              We may update these Terms and Conditions at any time to reflect changes in our policies, services, or applicable laws. It is your responsibility to review the updated terms regularly. By continuing to use our platform after updates are made, you acknowledge and agree to the revised terms. Significant changes will be communicated through notifications or updates on our website.
            </p>
          </section>

          <section className="mt-[25px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px]">
            <h2 className="text-2xl font-semibold mb-[11px]">10. Governing Law</h2>
            <p className="mb-4">
              These Terms and Conditions are governed by the laws of [Your Jurisdiction]. Any disputes arising from your use of our platform shall be resolved in the courts of [Your Jurisdiction]. By using our platform, you consent to the exclusive jurisdiction and venue of these courts.
            </p>
          </section>

          <section className="mt-[25px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px]">
            <h2 className="text-2xl font-semibold mb-[11px]">11. Contact Information</h2>
            <p className="mb-4">
              If you have any questions, concerns, or feedback about these Terms and Conditions, you can reach out to us at support@[yoursite].com. We are committed to addressing your inquiries and ensuring your experience with our platform is positive.
            </p>
          </section>

          <p className="text-sm text-gray-600 mt-6">
            Last updated: [Insert Date]
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default TermsComponent;
