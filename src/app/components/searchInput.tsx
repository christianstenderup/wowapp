"use client";

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, RadioGroup, Radio } from "@nextui-org/react";
import RealmsClient from "../clients/realmsClient";

export default function SearchInput() {

    // const realms = RealmsClient.getRealms();

    const [selectedRegion, setSelectedRegion] = React.useState("EU");
    const [selectedRealms, setselectedRealms] = React.useState(new Set(["Tarren-Mill"]));
    const selectedRealm = React.useMemo(
        () => Array.from(selectedRealms).join(", ").replaceAll("_", " "),
        [selectedRealms]
    );

    return (
        <div className="flex flex-col gap-3 content-center" >
            <RadioGroup
                className="content-center"
                orientation="horizontal"
                defaultValue="EU"
                onValueChange={setSelectedRegion}
            >
                <Radio value="EU">EU</Radio>
                <Radio value="US">US</Radio>
            </RadioGroup>

            <Dropdown className="w-1/6">
                <DropdownTrigger className="w-1/6">
                    <Button
                        variant="bordered"
                        className="capitalize"
                    >
                        {selectedRealm}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedRealms}
                    onSelectionChange={(selectedRealms) => setselectedRealms(selectedRealms as Set<string>)}
                >
                    <DropdownItem key="Tarren-Mill">Tarren-Mill</DropdownItem>
                    <DropdownItem key="Area 52">Area 52</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Input
                type="text"
                label="Character"
                defaultValue="Zugchini"
                className="max-w-xs"
            />

            <Button className="w-1/6" color="warning" variant="solid">
                Search
            </Button>
        </div>

    );
}
