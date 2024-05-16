"use client";

import React, { Key, useEffect, useState } from "react";
import { Selection } from "@react-types/shared";
import { RealmsDTO } from "../../clients/realmsClient";
import { ExpansionInstance, getCharacterDungeons, getCharacterRaids, getCharacters, WowCharacter } from "../../clients/characterClient";
import CharacterSheet, { CharacterDataDTO } from "./characterData";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import {Input} from "@nextui-org/input";

export default function SearchInput({ realms }: { realms: RealmsDTO[] }) {

    const [selectedRealm, setselectedRealm] = useState<string>();
    const [selectedCharacterName, setselectedCharacterName] = useState<string>();
    const [selectedCharacter, setselectedCharacter] = useState<CharacterDataDTO>();
    // const [selectedCharacter, setselectedCharacter] = useState<WowCharacter>();
    // const [characterRaids, setcharacterRaids] = useState<ExpansionInstance[]>();


    const getCharacterData = () => {
        const fetchData = async () => {
            const characterData = getCharacters(selectedRealm, selectedCharacterName?.toLowerCase());
            const raidsData = getCharacterRaids(selectedRealm, selectedCharacterName?.toLowerCase());
            const dungeonsData = getCharacterDungeons(selectedRealm, selectedCharacterName?.toLowerCase());

            const [character, raids, dungeons] = await Promise.all([characterData, raidsData, dungeonsData]);

            if (!character) {
                console.log(Error);
            }
            else {
                const characterData: CharacterDataDTO = {
                    character: character,
                    raids: raids,
                };
                setselectedCharacter(characterData);
            }
        }
        fetchData();
    }

    return (
        <div className="flex flex-col gap-3 content-center" >
            <Dropdown className="w-1/3">
                <DropdownTrigger className="w-1/3">
                    <Button
                        variant="bordered"
                        className="capitalize"
                    >
                        {selectedRealm}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedRealm}
                    onSelectionChange={(selection) => setselectedRealm(selection.currentKey)}
                    items={realms}>
                    {(realm) => (
                        <DropdownItem
                            key={realm.slug}

                        >
                            {realm.name}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>

            <Input
                isClearable
                type="text"
                label="Character"
                placeholder="Enter character name"
                value={selectedCharacterName}
                onValueChange={setselectedCharacterName}
                // defaultValue="Zugchini"
                className="w-1/3"
            />

            <Button className="w-1/3" color="warning" variant="solid" onClick={getCharacterData}>
                Search
            </Button>

            {selectedCharacter ? <CharacterSheet characterDTO={selectedCharacter} /> : <div></div>}
        </div>

    );
}