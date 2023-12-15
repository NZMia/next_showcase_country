'use client'

import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers';
import { useRouter } from 'next/navigation';

const NavigationBar = () => {
  const {value, clear} = useAuth();
  const router = useRouter();
  
  const handleLogout = async() => {
    if(clear) {
      try {
        await clear();
        router.replace('/');
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Flex align="center" justify="flex-end" p="4" bg="gray.700" gap={5}> 
    { value ?
      (
        <>
          <Link href="/information" passHref>
            <Button 
              colorScheme="gray" 
              variant="solid" 
              aria-label="Navigate to Information Page">
              Information
            </Button>
          </Link>
          <Link href="/updateUser" passHref>
            <Button 
              colorScheme="gray" 
              variant="solid" 
              aria-label="Navigate to Update User Page">
              Update User
            </Button>
          </Link>
          <Button 
            colorScheme="gray" 
            variant="solid" 
            onClick={handleLogout} 
            aria-label="Logout">
            Logout
          </Button>
        </> 
      ) : (
        <>
          <Link href="/" passHref>
            <Button 
              colorScheme="gray" 
              variant="solid" 
              aria-label="Navigate to Welcome Modal">
              Welcome Modal
            </Button>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default NavigationBar;
