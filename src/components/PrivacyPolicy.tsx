export default function PrivacyPolicy() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: May 18, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          This is a portfolio project created by Tavion Britt ("we," "our," or
          "us"). Your privacy is important to us, and this policy explains how
          we handle your information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          We collect the following information when you create an account:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
          <li>Email address</li>
          <li>Display name (optional)</li>
          <li>Authentication data when you sign in with Google OAuth</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          How We Use Your Information
        </h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          We use your information solely to:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
          <li>Provide authentication and access to your account</li>
          <li>Store your todo list data</li>
          <li>Enable the core functionality of the application</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Storage</h2>
        <p className="text-gray-700 leading-relaxed">
          Your data is stored securely using Supabase, a third-party backend
          service. We do not sell, rent, or share your personal information with
          any third parties for marketing purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          You have the right to:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
          <li>Access your personal data</li>
          <li>Delete your account and associated data at any time</li>
          <li>Request information about how your data is used</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="text-gray-700 leading-relaxed">
          We implement industry-standard security measures to protect your data.
          However, no method of transmission over the internet is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          This application uses:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
          <li>
            <strong>Supabase</strong> for authentication and data storage
          </li>
          <li>
            <strong>Google OAuth</strong> for optional sign-in functionality
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          These services have their own privacy policies governing how they
          handle your data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about this Privacy Policy, please contact:{" "}
          <br />
          <strong>Email:</strong>{" "}
          <a
            href="mailto:tavion.k.britt99@gmail.com"
            className="link underline"
          >
            tavion.k.britt99@gmail.com
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by updating the "Last Updated" date.
        </p>
      </section>
    </>
  );
}
