import { TimelineItemTypeEnum } from "../enum/timeline-item-type-enum";

export class TimelineObject {
    type: TimelineItemTypeEnum | string;
    year: string;
    name: string;
    shortDescription: string | null;
    fullDescription: string | null;
    link: string | null;
    linkName: string | null;
    company: string | null;
    customer: string | null;

    constructor($type: TimelineItemTypeEnum | string, $year: string, $name: string, $shortDescription: string | null,
        $fullDescription: string | null, $link: string | null, $linkName: string | null, $company: string | null, $customer: string | null) {
        this.type = $type;
        this.year = $year;
        this.name = $name;
        this.shortDescription = $shortDescription;
        this.fullDescription = $fullDescription;
        this.link = $link;
        this.linkName = $linkName;
        this.company = $company;
        this.customer = $customer;
    }

}