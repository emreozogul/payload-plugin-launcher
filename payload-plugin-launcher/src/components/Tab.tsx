"use client"
import { useState, useRef } from "react"


interface TabProps {
    index: number,
    isActive: boolean,
    href: string,
}

export function Tab() {
    return (
        <div>

        </div>
    )
}

export function TabContainer() {
    const [activeTab, setActiveTab] = useState(0);
    const [tabs, setTabs] = useState<TabProps[]>([]);

    return (
        <div>
            <Tab></Tab>
        </div>
    )


}