"use client";

import React from "react";
import { WowCharacter, ExpansionInstance } from "../../clients/characterClient";

export default function CharacterSheet( {characterDTO} : { characterDTO: CharacterDataDTO} ) {
    
    const currentSeason = characterDTO?.raids?.find((raid) => raid.expansion.id == 505);
    const currentInstances = currentSeason?.instances?.find((instance) => instance.instance.id == 1200);

    const completion = currentInstances?.modes.find((mode) => mode.difficulty.type.toLowerCase() == "normal");

    return (
        <div className="flex flex-col gap-3 content-center" >
            <div className="flex flex-col gap-3 content-center" >
                <span>Character: {characterDTO.character?.name}</span>
                <span>Average ILevel: {characterDTO.character?.average_item_level}</span>
                <span>Active spec: {characterDTO.character?.active_spec?.name.toString()}</span>
            </div>

            <div>
                {completion ?
                    <div className="flex flex-col gap-3 content-center" >
                        <span>Raid: {currentInstances?.instance.name} ({completion?.difficulty.name.toString()})</span>
                        <span>Status: {completion?.status.name.toString()}</span>
                        <span>Progress: {completion.progress.completed_count}/{completion.progress.total_count}</span>
                    </div>
                    :
                    <div>No raids found</div>
                }
            </div>
        </div>



    );
}

export interface CharacterDataDTO {
    character: WowCharacter | undefined;
    raids: ExpansionInstance[] | undefined;
  }
  