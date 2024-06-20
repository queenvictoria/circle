import { BaseService } from '@circle/core'

import {
  type SpacesCreateProps,
  type SpacesIndexProps,
  type SpacesShowProps,
  type CircleResponse
} from '@circle/types'


export class Spaces extends BaseService {
  endpoint = 'spaces'

  constructor ({api_key}: {api_key: string}) {
    super({ api_key })
  }

  // https://api.circle.so/#c2faf0c4-9903-4cdb-84c5-6a587e0f6c40
  /**
   * List all spaces in a community
   */
  list (params?: SpacesIndexProps): Promise<CircleResponse> {
    if ( !params?.community_id) throw new Error("Feed requires a `community_id` integer.")

    return this._get([], params)
  }
  index = this.list

  /**
   * Create a space in a community
   */
  add (params: SpacesCreateProps): Promise<CircleResponse> {
    return this._post(params)
  }
  create = this.add

  /**
   * Get a single space
   */
  retrieve ({id, community_id}: SpacesShowProps): Promise<CircleResponse> {
    const params = { community_id } as SpacesShowProps
    return this._get([id.toString()], params)
  }
  show = this.retrieve

  /**
   * Delete a single space
   */
  delete ({id}: {id: number}): Promise<CircleResponse> {
    if (!id) throw new Error("Delete requires an ID.")

    return this._delete(id.toString())
  }
  destroy = this.delete
}
