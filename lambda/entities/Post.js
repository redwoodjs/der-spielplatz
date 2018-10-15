import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('varchar')
  title = '';

  @Column('varchar')
  text = '';
}

export default Post;
