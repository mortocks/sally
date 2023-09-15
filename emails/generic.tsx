import { Layout } from "./components/layout";
import { Button, Hr, Link, Text } from "@react-email/components";

import { baseUrl } from './config';

export const GenericTemplate = () => (
  <Layout>
    <>
      <Text>
        Thanks for submitting your account information. You're now ready to make
        live transactions with Stripe!
      </Text>
      <Text>
        You can view your payments and a variety of other information about your
        account right from your dashboard.
      </Text>
      <Button pX={10} pY={10} className="bg-purple-500 text-white block rounded text-center" href="https://dashboard.stripe.com/login">
        View your Stripe Dashboard
      </Button>
      <Hr />
      <Text>
        If you haven't finished your integration, you might find our{" "}
        <Link href="https://stripe.com/docs">docs</Link> handy.
      </Text>
      <Text>
        Once you're ready to start accepting payments, you'll just need to use
        your live{" "}
        <Link href="https://dashboard.stripe.com/login?redirect=%2Fapikeys">
          API keys
        </Link>{" "}
        instead of your test API keys. Your account can simultaneously be used
        for both test and live requests, so you can continue testing while
        accepting live payments. Check out our{" "}
        <Link href="https://stripe.com/docs/dashboard">
          tutorial about account basics
        </Link>
        .
      </Text>
      <Text>
        Finally, we've put together a{" "}
        <Link href="https://stripe.com/docs/checklist/website">
          quick checklist
        </Link>{" "}
        to ensure your website conforms to card network standards.
      </Text>
      <Text>
        We'll be here to help you with any step along the way. You can find
        answers to most questions and get in touch with us on our{" "}
        <Link href="https://support.stripe.com/">support site</Link>.
      </Text>
      <Text>— The ACME team</Text>
    </>
  </Layout>
);

export default GenericTemplate;
