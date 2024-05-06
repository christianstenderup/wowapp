"use server";

import React, { Suspense, useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, RadioGroup, Radio } from "@nextui-org/react";
import { RealmsDTO, getRealms } from "../clients/realmsClient";
import SearchInput from "./searchInput";

export default async function CharacterSearch() {


    const realms = await getRealms() ?? []; 


    return (
        <div className="flex flex-col gap-3 content-center" >
            <RadioGroup
                className="content-center"
                orientation="horizontal"
                defaultValue="EU"
            >
                <Radio value="EU">EU</Radio>
                <Radio value="US">US</Radio>
            </RadioGroup>

            <Suspense fallback={<p>loading realms...</p>}>
                <SearchInput realms={ realms }/>
            </Suspense>
        </div>

    );
}
