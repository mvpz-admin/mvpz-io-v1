import { Autocomplete, BackgroundImage, Box, Button, Center, Container, Grid, Group, Image, Loader, Stack, Tabs, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createStyles } from "@mantine/styles";
import { IconBuildingStore, IconBusinessplan, IconCardsFilled, IconClothesRack, IconShirtSport, IconShoppingBag, IconShoppingCart } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AthleteCardDetails from "../../components/AthleteCardDetails";
import { callAPI, downloadFile } from "../../lib/utils";
import Store from "../../core/Components/MvpzStore/Store";
import Apparel from "../../core/Components/MvpzStore/Appreal";

const Index = () => {
  return (
    <div className='min-h-screen px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px]'>
        <Tabs variant='pills' defaultValue="store">
                <Tabs.List grow>
                    <Tabs.Tab value="store" icon={<IconCardsFilled size="2rem" />}>Cards</Tabs.Tab>
                    <Tabs.Tab value="appreal" icon={<IconShirtSport size="2rem" />}>Apparel</Tabs.Tab>
                    {/* <Tabs.Tab value="trade" icon={<IconBusinessplan size="0.8rem" />}>Trade</Tabs.Tab> */}
                </Tabs.List>

                <Tabs.Panel value="appreal" pt="xs">
             <Apparel />
                </Tabs.Panel>
                <Tabs.Panel value="store" pt="xs">
                <Store />
                </Tabs.Panel>
                               
            </Tabs>
    </div>
  )
}

export default Index
