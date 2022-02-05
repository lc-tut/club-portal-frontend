export type ClubExternal = {
	clubUUID: string
	clubSlug: string
	name: string
	description: string
	shortDescription: string
	camopus: 0 | 1
	clubType: 0 | 1 | 2
	updatedAt: string
	thumbnail: {
		id: string
		path: string
	}
}

export type ClubInternal = {
	clubUUID: string
	name: string
	description: string
	shortDescription: string
	camopus: 0 | 1
	clubType: 0 | 1 | 2
	updatedAt: string
	contents: string[]
	links: {
		label: string
		url: string
	}[]
	schedules: {
		month: number
		schedule: string
		remarks?: string
	}[]
	achievements: string[]
	imageIDs: number[]
	videos: string[]
	times: {
		date: string
		time: string
		remarks?: string
	}[]
	places: {
		place: string
		remarks?: string
	}[]
}