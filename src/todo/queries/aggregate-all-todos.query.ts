import { json } from 'express';
import { IDbQuery, QueryTypes } from 'src/shared/interfaces';
import { GetTodosQueryDto } from '../dto';

export const AggregateAllTodosQuery = (
  getTodosQueryDto: GetTodosQueryDto,
): IDbQuery => {
  return {
    queryType: QueryTypes.AGGREGATE,
    query: {
      pipeline: [
        {
          $match: {
            title: getTodosQueryDto.title,
            status: getTodosQueryDto.status,
          },
        },
        {
          $lookup: {
            from: 'todo-types',
            localField: 'type',
            foreignField: '_id',
            as: 'type',
          },
        },
        {
          $sort: JSON.parse(
            `{"${getTodosQueryDto.sortBy}":${
              getTodosQueryDto.isDescending ? -1 : 1
            }}`,
          ),
        },
        {
          $skip: getTodosQueryDto.page
            ? (getTodosQueryDto.page - 1) * getTodosQueryDto.pageSize
            : 0,
        },
        {
          $limit: getTodosQueryDto.pageSize ? getTodosQueryDto.pageSize : 10,
        },
      ],
    },
  };
};
