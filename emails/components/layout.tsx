import {
    Body,
    Container,
    Head,

    Html,
    Img,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import Hr from './hr';
  import { Tailwind } from '@react-email/tailwind';
  import * as React from 'react';
  import TailwindConfig from '../../tailwind.config';
  
import { baseUrl } from '../config';

type LayoutProps = {
    children: React.ReactNode
}
  
  export const Layout = ({ children } :LayoutProps) => (
    <Tailwind config={TailwindConfig}>
    <Html>
      <Head />
      <Preview>You're now ready to make live transactions with Stripe!</Preview>
      <Body className='bg-gray-100 text-base font-sans rounded-xl text-gray-600 mt-12'>
        <Container className='bg-white mx-auto mb-32'>
          <Section className="px-12 pt-12">
            <Img
              src={`${baseUrl}/static/logo.jpg`}
              width="50"
              height="50"
              alt="ACME"
            />
            <Hr />
            {children}
            <Hr />
            
            <Text className="text-gray-500 py-4">
              ACME, 26/53 Vernon Tce, Brisbane
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
    </Tailwind>
  );
  
  export default Layout;
  
  const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };
  
  const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
  };
  
  const box = {
    padding: '0 48px',
  };
  
  const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
  };
  
  const paragraph = {
    color: '#525f7f',
  
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left' as const,
  };
  
  const anchor = {
    color: '#556cd6',
  };
  
  const button = {
    backgroundColor: '#656ee8',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
  };
  
  const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
  };
  