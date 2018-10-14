import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,
} from 'typeorm';
import Comment from './Comment';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('varchar')
  title = '';

  @Column('text')
  text = '';

  @ManyToMany(() => Comment, { cascade: true })
  @JoinTable()
  comments = undefined;
}

export default Post;
