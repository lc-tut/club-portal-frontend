export type CarouselGalleryProps = {
	images: string[]
}

export type IntroductionMovieProps = {
	youtubeurl: string
}

export type DescriptionProps = {
	// [label: url] i.g. ["twitter": "twitter.com/~~"]
	snslinks?: [string, string][]
	content: string
}

export type DetailInformationProps = {
	activity?: string[]
	date?: string[]
	time?: string[]
	place?: string[]
	mail?: string[]
	website?: string[]
	remark?: string[]
}

export const snsList = ["twitter", "instagram"] as const

export type SnsId = (typeof snsList[number]) | "other"