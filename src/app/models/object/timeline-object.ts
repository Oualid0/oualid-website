import { TimelineItemTypeEnum } from "../enum/timeline-item-type-enum";

export interface TimelineObject {
    type: TimelineItemTypeEnum | string;
    dateStart: string;
    dateEnd: string | null;
    ongoing: boolean;
    name: string;
    description: string | null;
    link: string | null;
    linkName: string | null;
    company: string | null;
    customer: string | null;
    tech: string[] | null;
}
