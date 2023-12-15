

import { Box, Text, Link, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" p={4} bg="gray.700" color="white">
      <Flex justify="space-between" align="center">
        <Text>&copy; 2023 Created By Mia. All rights reserved.</Text>
        <Box>
          <Link mr={4} href="https://countries.trevorblades.com/">
            Open Source (API)
          </Link>
          <Link mr={4}  href="https://chakra-ui.com/docs/components">
            Chakra UI (Docs)
          </Link>
          <Link mr={4}  href="https://www.apollographql.com/docs/react/">
            Apollo Client (Docs)
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
