import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, ReactEventHandler } from 'react';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors } from 'src/constants/articleProps';
import { fontSizeOptions, fontFamilyOptions } from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	sidebarRef: React.RefObject<HTMLDivElement>;
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
  };

export const ArticleParamsForm = ({ isOpen, onToggle, sidebarRef, articleState, setArticleState}: ArticleParamsFormProps) => { 

	const [formState, setFormState] = useState<ArticleStateType>(articleState);

	useEffect(() => {
		setFormState(articleState); 
	  }, [isOpen]);

	const handleSubmit = () => {
		setArticleState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside ref={sidebarRef} className={[styles.container, isOpen ? styles.container_open : ""].join(" ")}>
				<form className={styles.form}>
			
				<Select
  				title="Шрифт"
  				selected={formState.fontFamilyOption}
  				options={fontFamilyOptions}
  				onChange={(option) =>
    			setFormState(prev => ({ ...prev, fontFamilyOption: option }))}
				/>
				
				<RadioGroup
  				name="font-size"
  				title="Размер текста"
  				options={fontSizeOptions}
  				selected={formState.fontSizeOption}
  				onChange={(option) =>
    			setFormState(prev => ({ ...prev, fontSizeOption: option }))}
				/>

				<Select
  				title="Цвет шрифта"
  				selected={formState.fontColor}
  				options={fontColors}
  				onChange={(option) =>
    			setFormState(prev => ({ ...prev, fontColor: option }))}
				/>

				<Separator/>

				<Select
  				title="Цвет фона"
  				selected={formState.backgroundColor}
  				options={backgroundColors}
  				onChange={(option) =>
    			setFormState(prev => ({ ...prev, backgroundColor: option }))}
				/>

				<Select
  				title="Ширина контента"
  				selected={formState.contentWidth}
  				options={contentWidthArr}
  				onChange={(option) =>
    			setFormState(prev => ({ ...prev, contentWidth: option }))}
				/>




					
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={handleReset}/>
						<Button title='Применить' htmlType='button' type='apply' onClick={handleSubmit}/>
					</div>
				</form>
			</aside>
		</>
	);
};
