import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import {
  ACCEPT_LANGUAGE,
  CURRENT_COMPANY_ID,
  CURRENT_USER,
} from './auth.constant';
import { ISessionUser } from './auth.types';
import { LanguageEnum } from '@prisma/client';
import { LanguageService } from 'src/language/language.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly clsService: ClsService,
    private readonly languageService: LanguageService,
  ) {}

  getCurrentUser() {
    return this.clsService.get<ISessionUser>(CURRENT_USER);
  }

  setCurrentUser(user: ISessionUser) {
    this.clsService.set(CURRENT_USER, user);
  }

  getCurrentCompanyId() {
    return this.clsService.get<string>(CURRENT_COMPANY_ID);
  }

  setCurrentCompanyId(companyId: string) {
    this.clsService.set(CURRENT_COMPANY_ID, companyId);
  }

  async getAcceptLanguage(): Promise<LanguageEnum> {
    const language = this.clsService.get<string>(ACCEPT_LANGUAGE);

    if (!language) {
      const languages = await this.languageService.getLanguages();
      const defaultLanguage = languages.find((lang) => lang.isDefault);
      return defaultLanguage?.id ?? LanguageEnum.EN_US;
    }

    return language.toUpperCase().replaceAll('-', '_') as LanguageEnum;
  }

  setAcceptLanguage(language: string | undefined) {
    this.clsService.set(
      ACCEPT_LANGUAGE,
      language?.toUpperCase().replaceAll('-', '_') as LanguageEnum,
    );
  }
}
