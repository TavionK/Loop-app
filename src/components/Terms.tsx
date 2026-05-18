import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer mb-4 flex items-center w-fit px-2 py-1 bg-white text-gray-600 rounded-md border border-gray-300 hover:text-gray-900 transition-all duration-300 ease-in-out hover:drop-shadow-sm/25"
      >
        <IoMdArrowBack />
        Back
      </button>
      <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: May 18, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          By accessing and using this Simple TODO List application, you agree to
          be bound by these Terms of Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
        <p className="text-gray-700 leading-relaxed">
          This is a portfolio project that provides a simple task management
          interface. The service is provided "as is" without any warranties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials
          </li>
          <li>
            You are responsible for all activities that occur under your account
          </li>
          <li>
            You must provide accurate information when creating your account
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
        <p className="text-gray-700 leading-relaxed mb-2">You agree NOT to:</p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
          <li>Use the service for any illegal purposes</li>
          <li>
            Attempt to gain unauthorized access to the service or other users'
            accounts
          </li>
          <li>Upload malicious code or attempt to disrupt the service</li>
          <li>
            Use the service to store sensitive or confidential information
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data and Privacy</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
          <li>
            Your use of this service is also governed by our Privacy Policy
          </li>
          <li>We reserve the right to delete inactive accounts</li>
          <li>You can delete your account and data at any time</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
        <p className="text-gray-700 leading-relaxed">
          This is a portfolio project. The code and design are the property of
          Tavion Britt.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          This service is provided as a portfolio demonstration. We are not
          liable for:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
          <li>Any data loss</li>
          <li>Service interruptions or downtime</li>
          <li>Any damages arising from use of the service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Termination</h2>
        <p className="text-gray-700 leading-relaxed">
          We reserve the right to terminate or suspend access to the service at
          any time, without notice, for any reason.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          We reserve the right to modify these terms at any time. Continued use
          of the service constitutes acceptance of modified terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
        <p className="text-gray-700 leading-relaxed font-semibold">
          This is a portfolio project and is not intended for production use or
          storage of important data. Use at your own risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-700 leading-relaxed">
          Questions about these Terms of Service? Contact: <br />
          <strong>Email:</strong>{" "}
          <a
            href="mailto:your-email@example.com"
            className="text-purple-600 hover:text-purple-700 underline"
          >
            your-email@example.com
          </a>
        </p>
      </section>
    </>
  );
}
