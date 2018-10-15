import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Author {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('varchar')
  name = '';

  @Column('varchar')
  surname = '';
}

export default Author;
