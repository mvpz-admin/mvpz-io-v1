// import { Stack, Tabs } from '@mantine/core';
// import { IconPhoto, IconMessageCircle, IconSettings, IconWallet, IconMailCog } from '@tabler/icons-react';
// import Newsletter from '../../components/Newsletter';
// import Wallet from '../../pages/profile/wallet';

// export default function Settings() {
//   return (
//      <div className='min-h-screen px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] '>
//          <Stack align={'start'} justify={'left'}>
//         <Tabs defaultValue="wallets" variant={"pills"}>
//             <Tabs.List grow>
//                 <Tabs.Tab value="wallets" icon={<IconWallet size="0.8rem" />}>Wallets</Tabs.Tab>
//                 <Tabs.Tab value="newsletter" icon={<IconMailCog size="0.8rem" />}>Newsletter</Tabs.Tab>
//             </Tabs.List>

//             <Tabs.Panel value="wallets" pt="lg" ml={32} pl="lg">
//                 <Wallet/>
//             </Tabs.Panel>

//             <Tabs.Panel value="newsletter" pt="lg" pl="xs" mt={64}>
//                 <Newsletter/>
//             </Tabs.Panel>
//         </Tabs>
//     </Stack>
//      </div>
//   );
// }