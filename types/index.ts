import { MouseEventHandler } from "react";

export interface CustomBtnProps {
    title: string,
    btnType?: "button" | "submit",
    containerStyles?: string,
    handleClick?: MouseEventHandler<HTMLButtonElement>,
    textStyles?: string,
    rightIcon?: string,
    isDisabled?: boolean
}

export interface Option {
    title: string,
    value: string
}

export interface CustomFilterProps {
    options: Option[],
    setFilter: (selected: any) => void
}

export interface ManufacturerProps {
    selected: string,
    setSelected: (selected: string) => void
}

export interface Car {
    city_mpg: number,
    class: string,
    combination_mpg: number,
    cylinders: number,
    displacement: number,
    drive: string,
    fuel_type: string,
    highway_mpg: number,
    make: string,
    model: string,
    transmission: string,
    year: number
}

export interface CarCardProps {
    car: Car,
}

export interface CarDetailsProps {
    isOpen: boolean,
    closeModal: () => void,
    car: Car
}

export interface FilterProps {
    manufacturer: string,
    model: string,
    year: number,
    fuel: string,
    limit: number
}

export interface ShowMoreProps {
    pageNumber: number,
    isNext: boolean,
    setLimit: (limit: number) => void
}

export type CarState = Car[] & { message?: string };