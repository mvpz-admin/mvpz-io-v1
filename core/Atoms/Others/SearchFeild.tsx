import { Autocomplete, Avatar, Group, Loader, MantineColor, SelectItemProps, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { forwardRef, useEffect, useState } from "react";

import React from 'react';
import { callAPI } from "../../../lib/utils";

const SearchField = ({ handleAthleteSelect, forAthleteSignup = false }) => {
    const [athletes, setAthletes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAthletes = async () => {
        const athletes = await callAPI({ endpoint: forAthleteSignup ? '/api/athletes' : '/api/user/athletes' });
        console.log({
            athletes
        });
        
        if (athletes.length) {
            setAthletes(forAthleteSignup 
                ? athletes.map(c => ({ ...c, value: `${c.Name} ${c.Sport}` })) 
                : athletes.map(c => ({ ...c, value: c.name || c.firstName || "" }))
            );
        }
        setLoading(false);
    };

    interface ItemProps extends SelectItemProps {
        color: MantineColor;
        SchoolName: string;
        image: string;
        Name: string;
        Position: string;
        Sport: string;
    }

    const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
        ({ SchoolName, Name, image, Position, Sport, id, ...others }: ItemProps, ref) => (
            <div ref={ref} {...others} key={id}>
                <Group noWrap mt={4} mb={4}>
                    <Avatar src={image} />
                    <div>
                        <Text>{Name}</Text>
                        <Group>
                            <Text size="xs" color="dimmed">
                                {SchoolName}
                            </Text>
                            <Text size="xs" color="dimmed" tt={"capitalize"}>
                                {Sport} {Position !== 'N/A' && `- ${Position}`}
                            </Text>
                        </Group>
                    </div>
                </Group>
            </div>
        )
    );

    useEffect(() => {
        setLoading(true);
        fetchAthletes();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <Autocomplete
            size="xs"
            placeholder="Search Athlete"
            data={athletes}
            rightSection={<IconSearch />}
            onItemSubmit={handleAthleteSelect}
            filter={(value, item) =>
                value ? item.value.toLowerCase().includes(value.toLowerCase().trim()) : false
            }
            itemComponent={forAthleteSignup ? AutoCompleteItem : undefined} // Use undefined instead of null
        />
    );
};

export default SearchField;
