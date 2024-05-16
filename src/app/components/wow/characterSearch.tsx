"use server";

import React, { Suspense, useEffect, useState } from "react";
import { getRealms } from "../../clients/realmsClient";
import SearchInput from "./searchInput";
import {RadioGroup, Radio} from "@nextui-org/radio";

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
