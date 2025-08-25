import { Args, Query, Resolver } from '@nestjs/graphql';
import { Language } from './language.model';
import { LanguageService } from './language.service';
import { GetLanguagesArgs } from './language.args';
import { Public } from 'src/auth/auth.decorator';
import './language.enum';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly languageService: LanguageService) {}

  @Query(() => [Language], {
    description: 'Get all languages with optional filtering by support status',
  })
  @Public()
  async languages(@Args() args: GetLanguagesArgs) {
    return this.languageService.getLanguages({
      isSupported: args.isSupported,
    });
  }
}
