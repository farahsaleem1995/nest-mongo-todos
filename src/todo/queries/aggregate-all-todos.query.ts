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
          $unwind: '$type',
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
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            status: 1,
            type: {
              _id: '$type._id',
              name: '$type.name',
            },
            properties: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ],
    },
  };
};
