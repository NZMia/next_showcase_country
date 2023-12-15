'use client'

import React, { useState, useEffect }from 'react';
import { useQuery } from '@apollo/client';
import { countriesQuery, QueryCountry, IInformation} from '@/graphql';
import { useAuth } from '@/providers';
import { useRouter } from 'next/navigation';

import {
  Grid,
  GridItem,
  useBreakpointValue,
  Center,
  Text,
  Modal,
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalCloseButton,
  ModalOverlay,
  useDisclosure,
  Box
} from '@chakra-ui/react'

const Information = () => {
  const { value } = useAuth();
  const { loading, error, data } = useQuery<QueryCountry>(countriesQuery);
  const router = useRouter(); 
  const [selectedCountry, setSelectedCountry] = useState<IInformation | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [countries, setCountries] = useState<IInformation[]>([]);

  useEffect(() => {
    // Redirect to the route if none value
    if (!value) router.replace('/');
  }, [value, router]);

  useEffect(() => {
    if (!loading && !error && data) {
      setCountries(data?.countries.slice(0, 12) || []);
    }
  }, [loading, error, data]);

  const handleItemClick = (country: IInformation) => {
    setSelectedCountry(country);
    onOpen();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Center display='flex' flexDirection='column' flex='1'>
      <Box textAlign={"center"}> 
          <Text
            fontSize="36px"
            fontWeight="bold"
            color="gray.700"
            marginBottom="15px"
            textTransform="uppercase"
          >
            Countries
          </Text>
      </Box>
      <Grid
        templateColumns={[
          'repeat(1, 1fr)', // show 1 column on mobile
          'repeat(3, 1fr)', // display 3 columns on tablet
          'repeat(4, 1fr)', // display 4 columns on desktop
        ]}
        gap={4}
        maxW="1024px"
        marginX="auto"
      >

        {countries 
          && countries.map((country: IInformation) => (
            <GridItem 
              colSpan={1} 
              bg="gray.700" 
              color="white" 
              p={4} 
              borderRadius={"8px"}
              cursor="pointer"
              onClick={() => handleItemClick(country)}
              key={country.code}
              aria-label={`${country.name} - Click to view details`}
            >
              <>
                <Text fontWeight="bold" textTransform="uppercase">
                  {country.name}
                </Text>
                <Text>
                  {country.emoji} ({country.code})
                </Text>
              </>
            </GridItem>
          )
        )}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader aria-describedby='Country Detail Modal'>Country Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCountry && (
              <>
                <Text fontWeight="bold" textTransform="uppercase">
                  {selectedCountry.name}
                </Text>
                <Text>
                  {selectedCountry.emoji} ({selectedCountry.code})
                </Text>
                <Text>
                  Capital: {selectedCountry.capital}
                </Text>
                <Text>
                  Currency: {selectedCountry?.currencies?.map((currency) => currency) || 'N/A'}
                </Text>
                <Text>
                  Languages: {selectedCountry?.languages?.map((lang) => lang?.name) || 'N/A'}
                </Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  )
}

export default Information;
