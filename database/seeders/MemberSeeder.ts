/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { promises } from 'fs'
import parse from 'csv-parse/lib/sync'
import Member from 'App/Models/Member'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

export default class MemberSeeder extends BaseSeeder {
  public async run () {
    const membersFile = 'tmp/members.csv'
    const pivotFile = 'tmp/member_team.csv'
    try {
      const members = await promises.readFile(membersFile)
      const pivotTables = await promises.readFile(pivotFile)

      const membersRecords = parse(members, {
        columns: true,
        skip_empty_lines: true,
      })
        .map((member: any) => {
          return {
            ...member,
            'birth_on': member.birth_on ? DateTime.fromISO(member.birth_on) : null,
          }
        })
      const pivotRecords = parse(pivotTables, {
        columns: true,
        skip_empty_lines: true,
      })

      await Member.createMany(membersRecords)
      await Database.table('member_team').multiInsert(pivotRecords)
    } catch (e) {
      console.log(`Error! File ${membersFile} or ${pivotFile} does not exist.`)
    }
  }
}
